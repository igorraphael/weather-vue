import { defineComponent } from 'vue'
import './style.less'

export default defineComponent({

    render() {

        return (

            <a-layout class="layout">
                <a-layout-header>

                    <div class="logo" />

                </a-layout-header>
                <a-layout-content style="padding: 0 50px">

                    <a-breadcrumb style="margin: 16px 0">
                        <a-breadcrumb-item>Home</a-breadcrumb-item>
                        <a-breadcrumb-item>List</a-breadcrumb-item>
                        <a-breadcrumb-item>App</a-breadcrumb-item>
                    </a-breadcrumb>

                    <div style={{ background: '#fff', padding: '24px', height: '280px' }}>Content</div>
                </a-layout-content>
                <a-layout-footer style="text-align: center">
                    Ant Design ©2018 Created by Ant UED
                </a-layout-footer>
            </a-layout>

        )
    }
})