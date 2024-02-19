<template>
  <css-doodle click-to-update use="var(--404)"></css-doodle>
</template>

<style lang='scss' scoped>
css-doodle {
  --404: (
    @grid: 10x5;
    @odd {
      position: absolute;
      @place: @m2(@r(0, 100)%);
      transition: all 1s ease;
      ::before {
        content: '404';
        font-size: @r(1rem, 5rem);
      }
      :hover {
        transform: scale(@r(1.01, 1.1));
      }
    }
  )
}
</style>
