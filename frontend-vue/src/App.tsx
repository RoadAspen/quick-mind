import { defineComponent, h, Transition } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  setup() {
    console.log(1);

    return () => (
      <RouterView>
        {({ Component }: { Component: any }) => (
          <Transition>{Component ? h(Component) : null}</Transition>
        )}
      </RouterView>
    );
  }
});
