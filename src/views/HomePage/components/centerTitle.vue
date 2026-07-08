<template>
    <div class="center-title">
        <div class="title-box">
            <div class="icon-title"></div>
            <div class="title-text">学习知识</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'CenterTitle',
}
</script>
<style scoped lang="scss">
.center-title {
    height: 100%;
    background: var(--title-bg);
    border: 1px solid #e4e7ed;
    font-size: 14px;
    color: var(--center-title-text-color);
    display: flex;
    align-items: center;
}
</style>