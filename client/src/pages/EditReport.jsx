import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ReportForm from '../components/ReportForm.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import PageTransition from '../components/PageTransition.jsx'
import { reportService } from '../services/reportService.js'
import { handleApiError } from '../utils/errorHandler.js'

export default function EditReport() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [report, setReport] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    let ignore = false

    const loadReport = async () => {
      try {
        const { data } = await reportService.getById(id)

        if (!ignore) {
          setReport(data.report ?? data)
        }
      } catch (error) {
        handleApiError(error, 'Could not load this report.')
        navigate('/reports/mine')
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    loadReport()

    return () => {
      ignore = true
    }
  }, [id, navigate])

  const handleSubmit = async (formData) => {
    try {
      setIsSubmitting(true)

      await reportService.update(id, formData)

      toast.success('Report updated.')

      navigate(`/reports/${id}`)
    } catch (error) {
      handleApiError(error, 'Could not update report.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <LoadingSpinner fullScreen label="Loading report..." />
  }

  if (!report) {
    return null
  }

  return (
    <PageTransition title="Edit Report">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-bold text-asphalt-900 dark:text-white">
          Edit Report
        </h1>

        <div className="mt-6">
          <ReportForm
            initialValues={report}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Save Changes"
          />
        </div>
      </div>
    </PageTransition>
  )
}