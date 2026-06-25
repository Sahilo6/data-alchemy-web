// Numbered, ruled section header - the recurring "printed program" device.
export default function SectionHead({ n, kicker, title, lead }) {
  return (
    <>
      <div className="sec-head">
        <span className="sec-index">{n}</span>
        <span className="sec-kicker">{kicker}</span>
      </div>
      <h2 className="sec-title">{title}</h2>
      {lead && <p className="sec-lead">{lead}</p>}
    </>
  )
}
