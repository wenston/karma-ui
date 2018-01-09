<script>
/**@augments which 哪一种图标类型
 * @augments type 该图标的哪一种样式，如下箭头down或者上箭头up
 * 
 * which(type):delete,arrow(up,down),success,plus,minus
 */
export default {
  name:'KIcon',
  props: {
    which: String,
    type: String
  },
  render() {
    let content = null,
      which = this.which.toLowerCase(),
      type = null;

    switch (which) {
      case "arrow": {
        type = this.type || "down";
        break;
      }
      default: {
        break;
      }
    }
    return (
      <div class='k-icon'>
        <i
          class={{
            'k-icon-type': true,
            ['k-icon-'+this.which]: true,
            ['k-icon-'+type]:type,
          }}
        >
          {content}
        </i>
      </div>
    );
  }
};
</script>

