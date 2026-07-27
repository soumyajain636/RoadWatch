import { Component } from 'react'

/**
 * Catches render-time errors anywhere below it so a single broken component
 * can never take down the whole app. API/async errors are handled separately
 * via axiosInstance + handleApiError (toasts), not by this boundary.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('Unhandled UI error:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-asphalt-50 dark:bg-asphalt-950 px-6 text-center">
          <h1 className="font-display text-4xl font-bold text-asphalt-900 dark:text-white">
            Something went wrong
          </h1>
          <p className="max-w-md text-asphalt-500 dark:text-asphalt-400">
            An unexpected error occurred. Try returning to the dashboard — if this keeps
            happening, please report it.
          </p>
          <button onClick={this.handleReset} className="btn-primary">
            Back to safety
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
