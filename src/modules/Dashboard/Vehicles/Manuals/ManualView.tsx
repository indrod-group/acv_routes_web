import React from 'react';
import { Card, Pagination, Popover, Table } from 'antd';
import { useVehicleManual } from '../../../../api/hooks';
import { Frequency, ManualTask, TASK_DETAILS } from '../../../../api/models';

interface ManualPaginationSpanProps {
  total: number;
  range: [number, number];
}

const ManualPaginationSpan: React.FC<ManualPaginationSpanProps> = ({ total, range }) => {
  return (
    <span className="px-2 py-1">
      Mostrando {range[0]} - {range[1]} de {total} tareas
    </span>
  );
}

type FrequencyValue = {
  number: number | null;
  unit: string | null;
};

const getValuesFromIntervals = (frequency: Frequency | undefined): FrequencyValue[] | null => {
  if (frequency === undefined) {
    return null;
  }
  return frequency.split(',').map((value) => {
    if (value === '-') {
      return {
        number: null,
        unit: null,
      };
    }

    const match = RegExp(/(\d+)([a-zA-Z]+)/).exec(value);
    if (match) {
      const number = parseInt(match[1], 10);
      const unit = match[2];

      return {
        number,
        unit,
      };
    }

    return {
      number: null,
      unit: null,
    };
  });
};

const checkIfATaskForNow = (frecuency: Frequency, currentValue: number | null, rep: number): boolean => {
  if(currentValue === null) {
    return false;
  }
  const values = getValuesFromIntervals(frecuency);
  const firstDistance = values != null ? values[0] : { number: 1, unit: null };
  if(firstDistance === null) {
    return false;
  }
  if(firstDistance.number === null) {
    return false;
  }
  return (currentValue * rep) % firstDistance.number === 0;
}

const VehicleManualComponent: React.FC = () => {
  const { manual, getManual } = useVehicleManual();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const handlePageChange = (page: number, pageSize?: number) => {
    setCurrentPage(page);
    if (pageSize) {
      setItemsPerPage(pageSize);
    }
  };

  React.useEffect(() => {
    getManual();
  }, [getManual]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTasks = manual?.manual_tasks.slice(startIndex, endIndex).map((tasks) => ({
    ...tasks, key: tasks.id
  }));

  const columns = [
    {
      title: 'Sistema',
      dataIndex: 'system',
      key: 'system',
    },
    {
      title: 'Subsistema',
      dataIndex: 'subsystem',
      key: 'subsystem',
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (text: string, record: ManualTask) => (
        <Popover content={record.help_me} title="Ayuda">
          <span>{text}</span>
        </Popover>
      ),
    },
  ];

  const values = getValuesFromIntervals(manual?.end_of_cycle as Frequency);
  const minValues = getValuesFromIntervals(manual?.minimum_frequency as Frequency);
  if (values != null && minValues != null) {
    const [firstDistance]: FrequencyValue[] = values;
    const [minFirstDistance, minSecondDistance, ]: FrequencyValue[] = minValues;
    if (minFirstDistance.number != null && minFirstDistance.unit != null && firstDistance.number != null && minSecondDistance.number != null && minSecondDistance.unit != null) {
      const repetitions = firstDistance.number / minFirstDistance.number;
      for (let r = 1; r <= repetitions; r++) {
        columns.push(
          {
            title: `${minFirstDistance.number * r}${minFirstDistance.unit} / ${minSecondDistance.number * r}${minSecondDistance.unit}`,
            dataIndex: `${minFirstDistance.number * r}${minFirstDistance.unit}`,
            key: `${minFirstDistance.number * r}${minFirstDistance.unit}`,
            render: (_: string, record: ManualTask) => (
              checkIfATaskForNow(record.frequency as Frequency, minFirstDistance.number, r) ? (
                <Popover content={TASK_DETAILS[record.task]} title="Ayuda">
                  <span>{record.task}</span>
                </Popover>
              ) : (
                <p></p>
              )
            ),            
          },
        )
      }
    }
  }

  return (
    <div>
      {manual ? (
        <>
          <Card title="Manual de Mantenimiento">
            <p><strong>Fecha de Inicio:</strong> {new Date(manual.start_date).toLocaleDateString()}</p>
            <p><strong>Alertas de Avance:</strong> {manual.advance_alerts}</p>
          </Card>
          <Pagination
            className="mt-4 mb-4 mx-auto"
            total={manual.manual_tasks.length}
            current={currentPage}
            onChange={handlePageChange}
            defaultPageSize={itemsPerPage}
            showSizeChanger
            showTotal={(total, range) => <ManualPaginationSpan total={total} range={range} />}
          />
          <Table
            showHeader
            pagination={false}
            columns={columns}
            dataSource={currentTasks}
            rowKey="id"
          />
        </>
      ) : (
        <p>Cargando manual...</p>
      )}
    </div>
  );
};

export default VehicleManualComponent;
