import { renderToFragment } from '@lib/renderer';
import { describe, expect, test } from 'vitest';
import WeatherBlock, { type Props } from './WeatherBlock.astro';

describe('WeatherBlock', () => {
  test('Block is rendered', async () => {
    const fragment = await renderToFragment<Props>(WeatherBlock, {
      props: {
        block: {}
      }
    });

    expect(fragment).toBeTruthy();
  });

  // Add more tests here
});
