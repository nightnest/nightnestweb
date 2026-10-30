import type { Guide } from '../../data/guides'
import { DeskScene, HallsRoomScene, KitFlatLay, NoiseLightScene } from './Scenes'

/** Cover art for a guide, chosen from the scene illustrations. */
export function GuideArt({ guide, className }: { guide: Guide; className?: string }) {
  const title = guide.title
  switch (guide.scene) {
    case 'desk':
      return <DeskScene className={className} title={title} />
    case 'room':
      return <NoiseLightScene className={className} title={title} />
    case 'window':
      return <HallsRoomScene className={className} title={title} />
    case 'planner':
      return <KitFlatLay className={className} title={title} />
  }
}
