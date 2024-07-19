import * as d3 from 'd3';
import React, { useEffect, useMemo } from 'react'
import './styles.css'

const YearAxis = ({ scale }) => {
    const dateTicks = useMemo(() => {

        return scale.ticks().map((date) => {
            return {
                date,
                year: date.getFullYear(),
                xOffset:scale(date)
            }
        })
    })

    return (
        <g>
            <path d="M 9.5 0.5 H 800.5" stroke="currentColor" />
            {
                dateTicks.map(({ year, xOffset }) => {
                    return (
                        <g key={year} transform={`translate(${xOffset}, 0)`}>
                            <line
                                y2="-6"
                                stroke="currentColor"
                            />
                            <text style={{
                                fontSize: '10px',
                                textAnchor: 'middle',
                                transform: 'translateY(-20px)'
                            }}>{year}</text>
                        </g>
                    )
                })
            }
        </g>
    )
}

const TimelineSpans = ({ data, scale }) => {
    const dateFormat = d3.timeParse('%Y-%m')

    return (
        <g>
            {
                data.map(({id, data}, i) => (
                    <>
                        <rect
                            key={id}
                            x={scale(dateFormat(data.yearsActive.end))}
                            y={i*40+8}
                            height={30}
                            fill='currentColor'
                            width={Math.abs(scale(dateFormat(data.yearsActive.end)) - scale(dateFormat(data.yearsActive.start)))}
                        />
                        <text
                            key={`${id}-text`}
                            x={scale(dateFormat(data.yearsActive.end))}
                            y={i*40+8}
                            dy={20}
                            dx={5}
                            fill='white'
                            fontSize='12px'>
                            {data.companyName}
                            </text>
                    </>
                ))
            }
        </g>
    )
}

export default function Timeline({ items }) {
    const yearsScale = d3.scaleTime()
    .domain([new Date(2025,1,1), new Date(2014, 6, 30)])
    .range([0, 800])


    return (
        <div className="timeline-wrapper">
            <svg viewBox='0 -100 800 400'>
                <TimelineSpans data={items} scale={yearsScale} />
                <YearAxis scale={yearsScale} />
            </svg>
        </div>
    )
}