<template>
  <el-row :gutter="20">
    <el-col :span="12">一直游到海水变蓝</el-col>
    <el-col :span="12">
      <el-row v-for="row in 3" :key="row">
        <el-col :span="8" v-for="col in 3" :key="col">
          <div class="g-pd-10">
            <css-doodle click-to-update :use="getDoodle(row, col)" />
          </div>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang='ts' setup>
import { random } from 'lodash'

const cssDoodleRule = ['--RandRect', '--AbstractShape', '--AbstractCircle', '--TransformRect', '--RandTriangle', '--AbstractRiver']

function getDoodle (row: number, col: number) {
  if (row === 2 && col === 2) return 'var(--Z)'
  return `var(${cssDoodleRule[random(0, cssDoodleRule.length - 1)]})`
}
</script>

<style lang='scss' scoped>
css-doodle {
  --gridSize: 8em;
  --bk: #60569E;
  --RandRect: (
    @grid: 5 / var(--gridSize);
    background: var(--bk);
    transform: scale(@rand(0.2, 0.9));
  );
  --TransformRect: (
    :doodle {
      --s: 0turn;
      grid-gap: 1px;
    }
    :doodle(:active) {
      --s: 0.5turn;
    }
    @grid: 3 / var(--gridSize);
    transition: 1s cubic-bezier(.175, .885, .32, 1.275);
    background: var(--bk);
    transform: rotate(@var(--s));
  );
  --AbstractShape: (
    @grid: 5 / var(--gridSize);
    background: linear-gradient(
      @rand(360deg),
      @stripe(#60569E, #E6437D, #EBBF4D)
    );
  );
  --AbstractCircle: (
    @grid: 1 / var(--gridSize);
    background: radial-gradient(
      circle at @r(100%) @r(100%),
      @m20(
        @p(#60569e, #ebbf4d) calc(@n(-1) * 100% / @N),
        @lp calc(@n * 100% / @N)
      )
    );
  );
  --RandTriangle: (
    @grid: 5 / var(--gridSize);
    background: rgba(96, 86, 158, @rand(.9));
    transition: .2s ease @rand(200ms);
    transform: rotate(@rand(360deg));
    clip-path: polygon(
      @rand(100%) 0, 100% @rand(100%), 0 @rand(100%)
    );
  );
  --AbstractRiver: (
    background: @shaders(
      texture_0 {
        @grid: 1 / 100%;
        background: linear-gradient(45deg, @stripe.@m20.@p(
          #FFF4E0, #F8B501, #06ACB5, #17191D, #FC3D3C
        ));
      }
      fragment {
        void main() {
          vec2 coords = vec2(r * cos(angle), r * sin(angle)) + c;
          FragColor = texture(texture_0, coords);
        }
      }
    );
  );
  --Z: (
    background: @svg(
      viewBox: 0 0 1 1;
      path {
        d: M 0 0 L 1 0 L 1 1;
        fill: red;
      }
    );
  );
}
</style>
