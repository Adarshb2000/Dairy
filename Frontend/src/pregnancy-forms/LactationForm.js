import DateElement from '../DateElement'

const LactationForm = ({ info }) => {
  return (
    <div className="pregnancy-box pregnancy-box-small">
      <h2 className="heading2">Chutai</h2>
      <DateElement
        name="lactationDate"
        label="Date:"
        defaultValue={info?.date}
      />
    </div>
  )
}

export default LactationForm
