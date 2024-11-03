import { Button, Switch } from "antd";
import { usePrintContext } from "./usePrintContext";

const ChangePrintableContent = () => {
  const { printTimeline, setPrintTimeline } = usePrintContext();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className='print:hidden flex items-center justify-end space-x-4'>
      <Switch
        checkedChildren="Imprimir línea de tiempo"
        unCheckedChildren="No imprimir línea de tiempo"
        checked={printTimeline}
        onChange={checked => setPrintTimeline(checked)} // Asegura que se pasa el nuevo estado
      />
      <Button onClick={handlePrint} type="primary">Imprimir</Button>
    </div>
  );
}

export default ChangePrintableContent;
