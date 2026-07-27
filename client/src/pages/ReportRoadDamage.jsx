import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import ReportForm from '../components/ReportForm.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { reportService } from '../services/reportService.js'
import { handleApiError } from '../utils/errorHandler.js'

export default function ReportRoadDamage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData) => {
    console.log("5. Parent handleSubmit called")

    try {
      setIsSubmitting(true)

      const { data } = await reportService.create(formData)

      console.log("6. API Success", data)

      toast.success('Report submitted. Thank you for helping keep roads safe.')

      navigate(`/reports/${data.report._id}`)
    } catch (error) {
      console.log("7. API Error:", error)
      console.log("Response:", error.response)
      console.log("Data:", error.response?.data)

      handleApiError(error, 'Could not submit report.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <PageTransition title="Report Road Damage">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">
          Report Road Damage
        </h1>

        <p className="mt-1 text-sm text-asphalt-500 dark:text-asphalt-400">
          Give as much detail as you can. Clear photos help repair crews prioritize.
        </p>

        <div className="mt-6">
          <ReportForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Submit Report"
          />
        </div>
      </div>
    </PageTransition>
  )
}