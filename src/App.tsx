import { LiFiWidget, ChainType } from '@lifi/widget'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useDisconnect } from 'wagmi'
import { useMemo } from 'react'
import './App.css'

function App() {
  const { openConnectModal } = useConnectModal()
  const { disconnect } = useDisconnect()

  const widgetConfig = useMemo(
    () => ({
      fee: 0,
      variant: 'wide' as const,
      subvariant: 'default' as const,
      chainTypes: [ChainType.EVM],
      walletConfig: {
        onConnect: () => openConnectModal?.(),
        async onDisconnect() {
          disconnect()
        },
      },
      theme: {
        container: {
          border: 'none',
          borderRadius: '0px',
          boxShadow: 'none',
          minHeight: '100vh',
        },
        palette: {
          mode: 'dark' as const,
          primary: { main: '#ff6b00' },
          secondary: { main: '#1a1a2e' },
          background: {
            default: '#0a0a14',
            paper: '#1a1a2e',
          },
        },
        shape: {
          borderRadius: 12,
          borderRadiusSecondary: 8,
        },
      },
    }),
    [openConnectModal, disconnect],
  )

  return (
    <div className="app">
      <div className="connect-button">
        <ConnectButton />
      </div>
      <div className="widget-wrapper">
        <LiFiWidget
          integrator="apeswap"
          config={widgetConfig}
        />
      </div>
    </div>
  )
}

export default App
