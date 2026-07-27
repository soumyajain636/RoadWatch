import { reportService } from './reportService.js'

export const mapService = {
  /** All reports that carry a location — used by Map Explorer's marker layer. */
  getMappableReports: async (params) => {
    const { data } = await reportService.getAll(params)
    const list = data.reports ?? data
    return list.filter(
      (r) =>
        r.location?.latitude != null &&
        r.location?.longitude != null
    )
  },

  /** Reports within a radius of a point — used by Nearby Reports. */
  getNearby: (params) => reportService.getNearby(params),
}
