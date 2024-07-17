import './styles.css'

const TimelineSpan = ({ data, index }) => {
    const { yearsActive } = data
    const { start, end } = yearsActive

    const columnSpan = 12 * (end - start)
    const columnStart = (start-2014) === 0 ? 1 : (start-2014) * 12

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

    return (
        <div className="timeline">
            <div className="timeline-grid">
            {
                items.map((item, index) => (
                    <TimelineSpan data={item.data} index={index} key={item.data.companyName} />
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
        </div>
    )
}