const getBaseUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:3000'

  const { protocol, hostname } = window.location
  const apiHost = hostname === 'localhost' || hostname === '127.0.0.1' ? 'localhost' : hostname

  return `${protocol}//${apiHost}:3000`
}

export class Endpoints {
  static BASE_URL = getBaseUrl()
}
