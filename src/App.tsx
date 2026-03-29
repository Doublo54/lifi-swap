import { LiFiWidget, ChainType, HiddenUI } from '@lifi/widget'
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
      hiddenUI: [HiddenUI.PoweredBy],
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
      <section className="recommendations">
        <h2 className="recommendations-title">Other swaps & bridges to check</h2>
        <div className="recommendations-grid">
          <a href="https://jumper.exchange/" target="_blank" rel="noopener noreferrer" className="rec-card">
            <span className="rec-name">Jumper</span>
            <span className="rec-tag">LI.FI</span>
            <p className="rec-desc">Multi-chain swap & bridge aggregator. Best routes across 20+ chains and dozens of DEXs.</p>
          </a>
          <a href="https://app.across.to/bridge-and-swap" target="_blank" rel="noopener noreferrer" className="rec-card">
            <span className="rec-name">Across</span>
            <span className="rec-tag">Bridge</span>
            <p className="rec-desc">Intent-based bridging with fast fills. Usually the cheapest and fastest for L2-to-L2 transfers.</p>
          </a>
          <a href="https://www.relay.link/bridge" target="_blank" rel="noopener noreferrer" className="rec-card">
            <span className="rec-name">Relay</span>
            <span className="rec-tag">Bridge</span>
            <p className="rec-desc">Instant cross-chain execution powered by relayers. Near-zero wait times for supported routes.</p>
          </a>
        </div>
      </section>
    </div>
  )
}

export default App
