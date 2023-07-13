import getRegions from './ListOfRegions'
import RegionModal from './RegionModal'

export default async function RegionsPage () {
  const regions = await getRegions()

  return (
    <RegionModal regions={regions} />
  )
}
