interface Task {
  content: string
  errorContent: string
  successContent: string
  id: number
  controls: AbortController[]
}