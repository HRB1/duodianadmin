import Vue from 'vue';
import {
    Icon, RadioGroup, RadioButton, Link, Button, Message, Form, FormItem, Input, Checkbox, Container, Aside, Submenu,
    MenuItem, MenuItemGroup, Menu, Header, Main, Select, Option, MessageBox, Table, TableColumn, Tabs, TabPane,
    Pagination, Dropdown, DropdownMenu, DropdownItem, Tag, InputNumber,Upload,Dialog,DatePicker} from 'element-ui';

Vue.use(Icon)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Link)
Vue.use(Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Checkbox);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Menu);
Vue.use(Header);
Vue.use(MenuItemGroup);
Vue.use(Main);
Vue.use(Select);
Vue.use(Option);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Pagination);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Tag);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(DatePicker);
Object.defineProperty(Vue, "Message", {
    value: Message
})
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;