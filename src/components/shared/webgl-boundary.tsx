"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

interface WebGLBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
}

interface WebGLBoundaryState {
  failed: boolean
}

export default class WebGLBoundary extends Component<
  WebGLBoundaryProps,
  WebGLBoundaryState
> {
  state: WebGLBoundaryState = { failed: false }

  static getDerivedStateFromError(): WebGLBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn("WebGL background disabled", error, errorInfo)
  }

  render() {
    return this.state.failed ? (this.props.fallback ?? null) : this.props.children
  }
}
