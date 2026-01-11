import React from 'react';
import toast from 'react-hot-toast';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    toast.error(error?.message || 'Beklenmeyen bir hata oluştu.');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-panel">
          <div className="max-w-md rounded-2xl bg-white p-8 shadow-card text-center">
            <h1 className="text-2xl font-display font-semibold text-ink">
              Hata oluştu
            </h1>
            <p className="mt-3 text-secondary text-sm">
              Lütfen sayfayı yenileyin veya biraz sonra tekrar deneyin.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
