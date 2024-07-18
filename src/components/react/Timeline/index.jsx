import { useEffect, useRef, useState } from 'react'
import { useMousePosition } from '../hooks'
import './styles.css'

const TimelineSpan = ({ data, index }) => {
    const { yearsActive } = data
    const { start, end } = yearsActive

    const columnSpan = 12 * (end - start)
    const columnStart = (2024-end) === 0 ? 1 : (2024-end) * 12

    const gridStyle = {
        gridRow: `${index+1} / span 1`,
        gridColumn: `${columnStart} / span ${columnSpan}`
    }
    return (
        <div style={gridStyle} className={`timeline-item`}>
            <h3>{data.companyName}</h3>
        </div>
    )
}

export default function Timeline({ items }) {
    const lineRef = useRef(null)
    const timelineRef = useRef(null)
    const mousePosition = useMousePosition()
    const [currentYear, setCurrentYear] = useState(2024)

    useEffect(() => {
        if (lineRef.current) {
            const timelineEl = timelineRef.current.getBoundingClientRect()
            lineRef.current.style.left = `${mousePosition.x - timelineEl.left}px`
        }
    }, [mousePosition])

    const handleYearHover = (e) => {
        let year = Number(e.target.dataset.year)
        if (!currentYear || (currentYear && (year !== currentYear))) {
            setCurrentYear(year)
        }
    }

    return (
        <div className="timeline" ref={timelineRef}>
            <div className="timeline-grid">
            {
                items.map((item, index) => (
                    <TimelineSpan data={item.data} index={index} key={item.data.companyName} />
                ))
            }
            {
                Array.from({length: 10}, (_, i) => 2024-i).map((year, i) => (
                    <div
                        key={year}
                        className="year-block"
                        onMouseEnter={handleYearHover}
                        style={{ gridRow: `1 /span 7`, gridColumn: `${12*i+1} / span 12`}}
                        data-year={year}>
                            {
                                ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                                .map((month, i) => (
                                    <div key={month} className="month-block" data-month={month} style={{gridRow: `1 / span 7`, gridColumn: `${i+1} / span 1`}}>
                                    </div>
                                ))
                            }
                        </div>
                ))
            }
            </div>
            {/* <div className="grid timeline-labels">
                {
                    Array.from({length: 10}, (_, i) => i+2014).map((year) => (
                        <div key={year} className="timeline-label">{year}</div>
                    ))
                }
            </div> */}
            <div className="line z-50" ref={lineRef}>
                <span className="p-2 block bg-white w-fit">{currentYear}</span>
            </div>
        </div>
    )
}