<template>
    <div class="top-header">
        <div class="header-center" @click="handleCollapse">
            <Operation />
        </div>
        <div class="header-actions">
            <div class="theme-toggle" @click="handleThemeToggle" :title="isDarkTheme ? '切换浅色主题' : '切换暗黑主题'">
                <el-icon :size="18">
                    <Sunny v-if="isDarkTheme" />
                    <Moon v-else />
                </el-icon>
            </div>
            <div class="weak-mode-toggle" @click="handleWeakModeToggle" :title="isWeakMode ? '关闭色弱模式' : '开启色弱模式'">
                <el-icon :size="18">
                    <View />
                </el-icon>
                <span class="weak-mode-label">色弱</span>
            </div>
        </div>
        <div class="header-bottom fl"></div>
    </div>
</template>
<script>
import {
    Operation,
    Sunny,
    Moon,
    View,
} from '@element-plus/icons-vue'
import { useCounterStore } from '@/stores/counter'
import { useThemeStore } from '@/stores/theme'
const counter = useCounterStore()
const themeStore = useThemeStore()
export default {
    components: {
        Operation,
        Sunny,
        Moon,
        View,
    },
    computed: {
        isDarkTheme() {
            return themeStore.theme === 'dark'
        },
        isWeakMode() {
            return themeStore.weakMode
        },
    },
    methods: {
        handleCollapse() {
            counter.toggleCollapse()
        },
        handleThemeToggle() {
            themeStore.toggleTheme()
        },
        handleWeakModeToggle() {
            themeStore.toggleWeakMode()
        },
    }
}
</script>
<style scoped lang="scss">
.top-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 12px;
    background: var(--header-bg);

    .header-center {
        display: flex;
        align-items: center;
        width: 18px;
        height: 18px;
        color: var(--header-icon-color);
        cursor: pointer;
    }

    .header-actions {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-left: auto;
        margin-right: 12px;

        .theme-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 32px;
            height: 32px;
            cursor: pointer;
            color: var(--header-icon-color);
            border-radius: 6px;
            transition: background 0.2s;

            &:hover {
                background: rgba(128, 128, 128, 0.15);
            }
        }

        .weak-mode-toggle {
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
            color: var(--header-icon-color);
            padding: 2px 6px;
            border-radius: 6px;
            font-size: 12px;
            transition: background 0.2s;

            &:hover {
                background: rgba(128, 128, 128, 0.15);
            }

            .weak-mode-label {
                font-size: 12px;
            }
        }
    }
}
</style>