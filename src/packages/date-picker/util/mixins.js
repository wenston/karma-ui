export default {
  methods: {
    $_is_in_max_min_range(d) {
      const max = new Date(this.max) - 0
      const min = new Date(this.min) - 0
      d = new Date(d) - 0
      if (max && min) {
        return d >= min && max >= d
      } else if (!max && !min) {
        return true
      } else if (max) {
        return d <= max
      } else if (min) {
        return d >= min
      }
      return true
    },
  },
}