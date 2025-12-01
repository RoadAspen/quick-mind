import {
  FullscreenExitOutlined,
  FullscreenOutlined
} from '@ant-design/icons-vue';
import { message, Tooltip } from 'ant-design-vue';
import screenfull from 'screenfull';
import { defineComponent, onMounted, ref } from 'vue';
export default defineComponent({
  name: 'Screenfull',
  setup() {
    const isFullscreen = ref(false);
    function click() {
      if (!screenfull.isEnabled) {
        message.warning('你的浏览器不支持全屏');
        return false;
      }
      screenfull.toggle();
    }
    function change() {
      isFullscreen.value = screenfull.isFullscreen;
    }
    function init() {
      if (screenfull.isEnabled) {
        screenfull.on('change', change);
      }
    }
    function destroy() {
      if (screenfull.isEnabled) {
        screenfull.off('change', change);
      }
    }
    onMounted(() => {
      init();
    });
    return () => (
      <div class="screenfull">
        <Tooltip placement="top" title={isFullscreen ? '退出全屏' : '切为全屏'}>
          {isFullscreen.value ? (
            <FullscreenExitOutlined class="text-[20px]" onClick={click} />
          ) : (
            <FullscreenOutlined class="text-[20px]" onClick={click} />
          )}
        </Tooltip>
      </div>
    );
  }
});
