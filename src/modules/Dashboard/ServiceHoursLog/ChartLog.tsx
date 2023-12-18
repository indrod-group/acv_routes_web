import { Helmet } from 'react-helmet';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Card } from 'antd';
import {
  getStatusData,
  getStatusLabel,
  filterAlarmsBy,
  getTicks
} from './ChartUtils';
import VehicleStats from './VehicleStats';
import * as d3 from 'd3';
import type { Alarm, Device } from '../../../api/models';
import { TimeDifferenceCalculator, Data } from './HandlerTimes';

interface ChartLogProps {
  selectedDevice: Device | null;
  alarms: Alarm[] | null;
  startDate: Date | null;
  endDate: Date | null;
}

const height = 300;
const marginTop = 20;
const marginRight = 20;
const marginBottom = 75;
const marginLeft = 100;

export default function ChartLog({ selectedDevice, alarms, startDate, endDate }: ChartLogProps) {
  const chartRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth * 0.85);

  const [incidents, setIncidents] = useState<Alarm[] | null>(null);
  const handleIncidents = useCallback((alarms: Alarm[] | null): void => {
    if (alarms !== null) {
      setIncidents(filterAlarmsBy(alarms, ["REMOVE", "SOS", "LOWVOT"]));
    }
  }, []);

  const [overspeedAlarms, setOverspeedAlarms] = useState<Alarm[] | null>(null);
  const handleOverspeedAlarms = useCallback((alarms: Alarm[] | null): void => {
    if (alarms !== null) {
      setOverspeedAlarms(filterAlarmsBy(alarms, ["OVERSPEED",]));
    }
  }, []);

  const [[timeOn, timeOff], setTime] = useState<number[]>([0, 0]);
  const handleTimes = useCallback((alarms: Data | null): void => {
    if (alarms !== null) {
      setTime(TimeDifferenceCalculator.calculateTimeDifferences(alarms));
    }
  }, []);

  useEffect(() => {
    handleIncidents(alarms);
    handleOverspeedAlarms(alarms);
    setWidth(window.innerWidth * 0.8);
    if (selectedDevice && alarms && chartRef.current && startDate && endDate) {
      const data: Map<Date, number> = getStatusData(alarms, startDate, endDate);
      const processData: Data = [Array.from(data)];
      handleTimes(processData);

      const x = d3.scaleUtc()
        .domain([startDate, endDate])
        .range([marginLeft, width - marginRight]);

      const y = d3.scaleLinear()
        .domain([0, 5])
        .range([height - marginBottom, marginTop]);

      const svg = d3.select(chartRef.current)
        .attr('width', width)
        .attr('height', height);

      // Limpia el SVG antes de cada renderizado.
      svg.selectAll("*").remove();

      const line = d3.line()
        .defined(d => !isNaN(d[1]))
        .x(d => x(d[0]))
        .y(d => y(d[1]))
        .curve(d3.curveStepAfter);

      // Ordena los datos por fecha antes de pasarlos a la función line.
      svg.append("path")
        .data(processData)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("d", d => line(d.map(([date, num]) => [+date, num])));

      const gY = svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y)
          .ticks(5)
          .tickFormat((d) => getStatusLabel(d as number))
          .tickSizeInner(-width + marginLeft + marginRight)
          .tickSizeOuter(0));

      // Ajusta el estilo de las líneas de cuadrícula.
      gY.selectAll(".tick line")
        .attr("stroke-dasharray", "2,2")
        .attr("stroke", "#ddd");

      const ticks = getTicks(width || 800, timeOn + timeOff || 86400);
      const countableInterval = ticks <= 60 ? d3.timeMinute : d3.timeHour;

      const xAxis = d3.axisBottom(x)
        .ticks(countableInterval.every(ticks <= 60 ? ticks || 60 : Math.floor(ticks / 60) || 1))
        .tickFormat(function (d) {
          if (d instanceof Date) {
            return d.getHours() === 0 && d.getMinutes() === 0 ? d3.timeFormat("%d-%m-%Y")(d) : d3.timeFormat("%H:%M")(d);
          }
          return '';
        })
        .tickSizeInner(-height + marginTop + marginBottom)
        .tickSizeOuter(0);

      const gX = svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(xAxis);

      // Ajusta el estilo de las líneas de cuadrícula.
      gX.selectAll(".tick line")
        .attr("stroke-dasharray", "2,2")
        .attr("stroke", "#ddd");

      // Rota los labels 45 grados.
      gX.selectAll(".tick text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

      const tooltip = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")
        .style("background", "#ffffff")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "5px")
        .style("padding", "10px");

      svg.selectAll("circle")
        .data([...data])
        .enter().append("circle")
        .attr("r", 1.5)
        .attr("cx", d => x(d[0]))
        .attr("cy", d => y(d[1]))
        .on("mouseover", function (_, d) {
          // Muestra el tooltip.
          tooltip.style("visibility", "visible")
            .text(`Hora: ${d3.timeFormat("%H:%M:%S")(d[0])}, Estado: ${getStatusLabel(d[1])}`);
        })
        .on("mousemove", function (event: MouseEvent) {
          // Mueve el tooltip.
          tooltip.style("top", `${event.pageY - 10}px`).style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function () {
          // Oculta el tooltip.
          tooltip.style("visibility", "hidden");
        });
    }
  }, [
    width,
    selectedDevice,
    alarms,
    startDate,
    endDate,
    timeOff, timeOn,
    handleIncidents,
    handleOverspeedAlarms,
    handleTimes,
  ]);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/c3/0.7.20/c3.min.css" />
      </Helmet>
      <Card
        title={`Vehículo ${selectedDevice?.license_number as string}`}
        className="print:block bg-white shadow rounded-md"
      >
        <svg className="w-full" ref={chartRef}></svg>
      </Card>
      <VehicleStats
        timeOn={timeOn || 0}
        timeOff={timeOff | 0}
        numAlarms={alarms?.length || 0}
        numIncidents={incidents?.length || 0}
        numSpeeding={overspeedAlarms?.length || 0}
        totalTravelTime={(timeOn + timeOff) || 0}
        alarms={alarms}
      />
    </>
  );
}