import { Toggle } from '@views/components/toggle'

interface Props {
  enabled: boolean
  setEnabled: (enabled: boolean) => void
  isActive: boolean
  handleActive: () => void
}

export function Footer({ enabled, setEnabled, isActive, handleActive }: Props) {
  return (
    <div className="flex items-center justify-end">
      <Toggle
        enabled={enabled}
        setEnabled={setEnabled}
        enableText="Obrigatório *"
        disableText="Opcional"
      />
      <button type="button" onClick={handleActive}>
        {isActive ? 'Desabilitar' : 'Habilitar'}
      </button>
    </div>
  )
}
