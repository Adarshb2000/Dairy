import DateElement from '../DateElement'

const LactationForm = () => {
  return (
    <div className="pregnancy-box h-48 sm:h-28">
      <h2 className="heading2">Hurai</h2>
      <DateElement name="lactationDate" label="Date:" className="inputs w-20" />
    </div>
  )
}

export default LactationForm
