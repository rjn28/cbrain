/**
 * Composant affichant les icônes des intégrations partenaires
 */

import Image from "next/image"
import { INTEGRATIONS } from "@/config/integrations"

export function IntegrationIcons() {
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {INTEGRATIONS.map((integration) => (
        <div
          key={integration.name}
          className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
          title={integration.name}
        >
          <Image
            src={integration.icon}
            alt={integration.name}
            width={32}
            height={32}
            className="w-8 h-8"
            unoptimized
          />
        </div>
      ))}
    </div>
  )
}
