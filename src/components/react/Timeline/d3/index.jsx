import * as d3 from 'd3';
import { useEffect, useMemo, useRef, useState } from 'react';
import './styles.css';
import { useMousePosition } from '../../hooks';

const TimelineAxis = ({ scale }) => {
  const dateTicks = useMemo(() => {
    return scale.ticks().map((date) => {
      return {
        date,
        year: date.getFullYear(),
        xOffset: scale(date),
      };
    });
  });

  return (
    <g>
      <path d="M 9.5 0.5 H 800.5" stroke="currentColor" />
      {dateTicks.map(({ year, xOffset }) => {
        return (
          <g key={year} transform={`translate(${xOffset}, 0)`}>
            <line y2="-6" stroke="currentColor" />
            <text
              style={{
                fontSize: '10px',
                textAnchor: 'middle',
                transform: 'translateY(-20px)',
              }}
            >
              {year}
            </text>
          </g>
        );
      })}
    </g>
  );
};

const TimelineSpans = ({ data, scale }) => {
  const dateFormat = d3.timeParse('%Y-%m');

  return (
    <g>
      {data.map(({ id, data }, i) => (
        <>
          <rect
            key={id}
            x={scale(dateFormat(data.yearsActive.end))}
            y={i * 40 + 8}
            height={30}
            fill="currentColor"
            width={Math.abs(
              scale(dateFormat(data.yearsActive.end)) -
                scale(dateFormat(data.yearsActive.start))
            )}
          />
          <text
            key={`${id}-text`}
            x={scale(dateFormat(data.yearsActive.end))}
            y={i * 40 + 8}
            dy={20}
            dx={5}
            fill="white"
            fontSize="12px"
          >
            {data.companyName}
          </text>
        </>
      ))}
    </g>
  );
};

const TickTracker = ({ height, scale, parentEl }) => {
  const formatMonth = d3.timeFormat('%b');
  const [offset, setOffset] = useState(0);

  const {x,y} = useMousePosition();

  useEffect(() => {
    if (!parentEl.current) return;
    setOffset(x - parentEl.current.getBoundingClientRect().left);

  }, [x, y, offset])
  return (
    <g>
      <line x1={offset} x2={offset} y1={0} y2={height} stroke="currentColor" strokeWidth={1}/>
      <text x={offset}>
        {`${formatMonth(scale.invert(offset))} ${scale.invert(offset).getFullYear()}`}
      </text>
    </g>
  )
}

export default function Timeline({ items }) {
  const timelineEl = useRef(null);
  const yearsScale = d3
    .scaleTime()
    .domain([new Date(2025, 1, 1), new Date(2014, 6, 30)])
    .range([0, 800]);

  return (
    <div className="timeline-wrapper relative w-full" ref={timelineEl}>
      <svg viewBox="0 -100 800 400">
        <TimelineSpans data={items} scale={yearsScale} />
        <TimelineAxis scale={yearsScale} />
        <TickTracker height={400} scale={yearsScale} parentEl={timelineEl}/>
      </svg>
    </div>
  );
}
