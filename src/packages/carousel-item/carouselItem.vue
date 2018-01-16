<script>
export default {
  name:'KCarouselItem',
  render() {

    return (
      <div class="k-carousel-item">
        {this.$slots.default}
      </div>
    )
  }
}
</script>
