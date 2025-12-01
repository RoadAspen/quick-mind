import { Breadcrumb } from 'ant-design-vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BreadcrumbTsx',
  setup(props) {
    return () => (
      <Breadcrumb>
        <Breadcrumb.Item>1</Breadcrumb.Item>
        <Breadcrumb.Item>2</Breadcrumb.Item>
        <Breadcrumb.Item>3</Breadcrumb.Item>
      </Breadcrumb>
    );
  }
});
