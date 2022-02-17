To better understand and derive value from the Pyth price data for a given product like SOL/USDC, we'll want to visualize that data in a meaningful format. A line chart is a basic way to display an increase or decrease in a value over time, so we will look at how to effectively represent our price data using a pre-made component library called [recharts](https://recharts.org/).

This helps to illustrate the price data coming from Pyth and also sets the stage for us to be able to to perform buy/sell operations using a DEX. We'll be calculating our buy and sell signals based on the Exponential Moving Average (EMA) which is a naive and un-opinionated method of achieving yield. There are more complex ways of deciding when and how much to trade, which are all beyond the scope of this pathway. Using the EMA, as long as the price trends upwards for the amount of time you are trading, you would expect to see a positive yield. Since this is an exercise in buying low and selling as the price rises, it's simple enough to avoid spending over your target by stopping the liquidation bot.

Slightly separate topics, though worth considering if you wish to build upon the basics of this Pathway: What is a novel and interesting way to calculate when to buy and when to sell? Are there ways in which you might safeguard against a particularly wide confidence interval, or even a sudden shock to the market?

---

# 👀 Charting Pyth data

The **chart** being rendered on the right is defined in `components/protocols/pyth/components/ChartMock.tsx`, which contains some of the price feed component from the Connect step and the Chart component defined in `components/protocols/pyth/components/Chart.tsx`. Toggling on the price feed will populate the chart, by passing the data to the Chart component. You can probably tell where we're going with this 😉

```jsx
// components/protocols/pyth/components/ChartMock.tsx
// ...
<Card>
  <Chart data={data} />
</Card>
// ...
```

---

# 📈 Moving Averages

{% hint style="info" %}
We need to calculate the Simple Moving Average (SMA), to kickstart the EMA with a point of reference. This is why you will not see the green line representing the EMA on the chart right away when starting it up.
{% endhint %}

Because what we are building is effectively a financial application, we want to display the moving average we'll be using to determine our buy & sell signals for the tokens we want to trade.

For the hard-boiled engineers and the truly devoted learners, there is a dry explanation of Exponential Moving Average (EMA) calculations available on [Wikipedia](https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average) but this is likely to be _very_ confusing to most readers. Luckily, there is a much simpler way to visualize this formula and what it will produce!

The EMA formula can be expressed as:

![EMA Formula](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/pyth/ema_formula.png)

- `EMAc` is the currently calculated EMA - "c" stands for "current", because we are going to be using a time frame smaller than a single day on our chart. This is the product of our calculation, but don't get too hung up on this.
- `value` is the current value, so in our case the price being reported by Pyth.
- `EMAp` is the previously calculated EMA - "p" stands for "previous".
- `weight` is a multiplier that gives less importance to older values. This can also be referred to as a "smoothing factor". To calculate the `weight` we require a time frame, known as a **window** (this can be an arbitrary number: 10 days, 5 days, 45 minutes, etc.)

We need to define our **smoothing factor** or `weight`, which can be done by dividing 2 by the **window** + 1:

![Weight Formula](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/pyth/weight_calculation.png)

```typescript
// solution
// * text example for accessibility *

           2
weight = -----
         w + 1

// components/protocols/pyth/components/Chart.tsx

// Formula: EMAc = (value - EMAp) * weight + EMAp
const ema = (newData.price - previousEma) * smoothingFactor + previousEma;
```

![EMA Chart](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/pyth/ema_chart.png)

We can add a `setData` hook to the `getPythData` function that we created in our initial Connect component, so that the `data` is being calculated on the spot, then passed into the Chart component. `newData` is defining the data structure in place, and populating the object with the price, confidence and a timestamp. We're using this `data` in the Chart component. You'll notice that we leave the SMA, EMA and trend as `undefined`. They're being calculated and set inside `setData` 😀

```typescript
// components/protocols/pyth/components/ChartMock.tsx

  const getPythData = async (checked: boolean) => {
    pythConnection.onPriceChange((product, price) => {
      // ...
        const newData: {
          price: number;
          priceConfidenceRange: number[];
          ts: number;
          sma: undefined | number;
          ema: undefined | number;
          trend: undefined | boolean;
        } = {
          price: price.price,
          priceConfidenceRange: [
            price?.price! - price?.confidence!,
            price?.price! + price?.confidence!,
          ],
          ts: +new Date(),
          sma: undefined,
          ema: undefined,
          trend: undefined,
        };

        /**
         * window & smoothingFactor are used to calculate the Exponential moving average.
         */
        const window = 10;
        const smoothingFactor = 2 / (window + 1);

        /**
         * Calculate Simple moving average:
         *   https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average
         * Calculate Exponential moving average:
         *   https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average
         * The Exponential moving average has a better reaction to price changes.
         *
         * Ref: https://blog.oliverjumpertz.dev/the-moving-average-simple-and-exponential-theory-math-and-implementation-in-javascript
         */
        setData((data) => {
          if (data.length > window) {
          // ...
```

This next piece of code is how we are defining our buy and sell signals based on the trend of the EMA. Pivoting on the value being entered for the `yieldExpectation`, we can make a simple calculation to emit a **buy** signal if the trend is greater than our expected yield, otherwise emit a **sell** signal. The `signalListener` is an instance of an `EventEmitter` (read more about [the `events` module](https://nodejs.org/api/events.html#events) and [EventEmitters](https://nodejs.org/api/events.html#class-eventemitter) if you need to brush up) - this essentially lets us run any functions listening to the event when it is triggered. We can just emit the event here in our code and know that the relevant functions to add the orders to the order book will be called. We'll touch on this again soon, when we're performing our token swaps.

```typescript
// components/protocols/pyth/components/ChartMock.tsx

// ...
            /**
             * Trend of the price with respect to preview EMA.
             * If the price is higher than the EMA, it is a positive trend.
             * If the price is lower than the EMA, it is a negative trend.
             *
             * The signalListener emits an event carrying the buy or sell signal,
             * which we will manage with RxJS and use to populate the order book
             * used by the liquidation bot.
             */
            const trend = newData.ema / data[data.length - 1].ema;
            if (trend * 100 > 100 + yieldExpectation) {
              signalListener.emit('buy');
            } else if (trend * 100 < 100 - yieldExpectation) {
              signalListener.emit('sell');
            }
          }
          return [...data, newData];
        });
// ...
};
```

The returned `data` is what we are passing to the Chart component.

---

# 🧱 Building the Chart component

There is a concise [getting started guide](https://recharts.org/en-US/guide/getting-started) on the recharts website which should bring you up to speed for reading the contents of `components/protocols/pyth/components/Chart.tsx`. There isn't anything complicated going on with this component, but let's quickly break down the code for better understanding.

We'll import any other code we need at the beginning of the file, including the recharts components. This `Chart` component has a single `useEffect`, which contains `data` in the dependency array - so any time the `data` changes, this component will re-render. All we're doing is making sure that the data exists by checking that the length is greater than zero, and then setting the domain for our chart data. The entire `data` object, as defined in `ChartMock.tsx` will be passed to the rechart `AreaChart` component. The rest of this component is effectively passing properties to the components and defining the style of the chart. No need to focus on this part unless you're very particular about how the information is displayed. You might want to change the colors, or even try a completely different style of chart. The recharts library is fast and quite flexible.

```tsx
// components/protocols/pyth/components/Chart.tsx

import {Select} from 'antd';
import {useEffect, useState} from 'react';
import {Area, AreaChart, Line, Tooltip, XAxis, YAxis} from 'recharts';

export const Chart: React.FC<{data: any}> = ({data}) => {
  const [domain, setDomain] = useState({dataMax: 0, dataMin: 0, price: 10});
  const [selectedTimeRange, setSelectedTimeRange] = useState('LIVE');
  useEffect(() => {
    if (data.length > 0) {
      const lastRange = data[data.length - 1].priceConfidenceRange;
      if (domain.dataMax < lastRange[1]) {
        setDomain({
          ...domain,
          dataMax: lastRange[1],
          dataMin: lastRange[0],
          price: data[data.length - 1].price,
        });
      }
    }
  }, [data]);
  return (
    <>
      <Select
        value={selectedTimeRange}
        defaultValue="LIVE"
        onChange={(value) => setSelectedTimeRange(value)}
      >
        <Select.Option value={'LIVE'}>LIVE</Select.Option>
        <Select.Option value={'1D'}>DAY</Select.Option>
        <Select.Option value={'1W'}>WEEK</Select.Option>
      </Select>
      <AreaChart
        width={730}
        height={250}
        data={data}
        stackOffset="none"
        syncMethod={'index'}
        layout="horizontal"
        barCategoryGap={'10%'}
        barGap={4}
        reverseStackOrder={false}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
      >
        <Tooltip />

        <YAxis
          stroke={'#222'}
          domain={[domain.dataMin, domain.dataMax || 'auto']}
          tickCount={4}
          scale="linear"
        />
        <XAxis
          stroke={'#222'}
          dataKey="ts"
          height={100}
          interval={'preserveStartEnd'}
          minTickGap={0}
          tickLine={false}
          tick={CustomizedHistoricalHourAxisTick}
        />

        <Area dataKey="priceConfidenceRange" stroke="#8884d8" fill="#8884d8" />
        <Area dataKey="price" stroke="#000" fillOpacity={0} />
        <Area dataKey="sma" stroke="#FF0000" fillOpacity={0} />
        <Area dataKey="ema" stroke="#00FF00" fillOpacity={0} />
      </AreaChart>
    </>
  );
};
```

The `CustomizedHistoricalHourAxisTick` is used to display the vertically oriented timestamps at the bottom of the chart. All we're doing here is rotating the text and adding a timestamp via the JavaScript `Date` class and the `toLocaleTimeString` method.

```typescript
const CustomizedHistoricalHourAxisTick = ({x, y, fill, payload}) =>
  payload.value ? (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill={fill}
        transform="rotate(-90) translate(0,-9.5)"
      >
        {new Date(payload.value).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </text>
    </g>
  ) : null;
```

---

# 🌱 Bringing the Chart to life

The Chart component is deceptively simple, most of it is setting up how the chart will look. Recharts has a declarative style, which makes it easy to follow the display logic and see where the values are being passed. We already calculated our SMA / EMA in the `ChartMock.tsx` component, and now they'll be displayed alongside the Pyth price data as red and green lines.

Clicking on the price feed toggle switch will begin fetching price data from Pyth and passing it along to the Chart component. The green line indicating the EMA will not appear at first, because an exponential moving average requires a historical value to be calculated against. One thing to notice is how the SMA does not react to changes in the price in the same way that the EMA does. After a few seconds, the green line indicating the EMA will appear and begin tracking along the chart. You will notice that it does not precisely follow Pyth's reported price. In most cases, it will fall within the range of the confidence interval - however there can be cases where it appears to fall outside of the confidence interval. You can coroborate using the Simple moving average if you like. You can inspect the actual values at a given tick by moving your mouse cursor over the chart, which will display the Tooltip.

![EMA Outside Confidence Interval](https://raw.githubusercontent.com/figment-networks/learn-web3-dapp/main/markdown/__images__/pyth/ema_outside_confidence.png)

---

# 🏋️ Challenge

{% hint style="tip" %}
In `components/protocols/pyth/lib/ChartMock.tsx`, finish the `setData` function by implementing the EMA formula in the `currentEma` and emitting the proper events for the `trend` conditions. You must replace the instances of `undefined` with working code to accomplish this.
{% endhint %}

**Take a few minutes to figure this out**

```typescript
//...
setData((data) => {
  if (data.length > window) {
    const windowSlice = data.slice(data.length - window, data.length);
    const sum = windowSlice.reduce((prev, curr) => prev + curr.price, 0);
    newData.sma = sum / window;

    const previousEma = newData.ema || newData.sma;
    const currentEma = undefined;
    newData.ema = currentEma;

    const trend = newData.ema / data[data.length - 1].ema;
    if (trend * 100 > 100 + yieldExpectation) {
      undefined;
    } else if (trend * 100 < 100 - yieldExpectation) {
      undefined;
    }
  }
  return [...data, newData];
});
//...
```

**Need some help?** Check out these links & hints 👇

- There's a great article on [implementing moving averages in JavaScript](https://blog.oliverjumpertz.dev/the-moving-average-simple-and-exponential-theory-math-and-implementation-in-javascript)
- [Emitting events](https://nodejs.org/api/events.html#emitteremiteventname-args) in JavaScript is a handy skill

Still not sure how to do this? No problem! The solution is below so you don't get stuck.

---

# 😅 Solution

```typescript
// solution
//...
setData((data) => {
  if (data.length > window) {
    const windowSlice = data.slice(data.length - window, data.length);
    const sum = windowSlice.reduce((prev, curr) => prev + curr.price, 0);
    newData.sma = sum / window;

    const previousEma = newData.ema || newData.sma;
    const currentEma =
      (newData.price - previousEma) * smoothingFactor + previousEma;
    newData.ema = currentEma;

    const trend = newData.ema / data[data.length - 1].ema;
    if (trend * 100 > 100 + yieldExpectation) {
      signalListener.emit('buy');
    } else if (trend * 100 < 100 - yieldExpectation) {
      signalListener.emit('sell');
    }
  }
  return [...data, newData];
});
//...
```

**What happened in the code above?**

- We're checking that the length of the `data` array is greater than the `window`
- We `slice` off the data we want from the array and store it in the `windowSlice` variable
- The reducer goes through the array using the callback function on every element to arrive at the `sum`
- We set the `sma` property of `newData` to equal the `sum` divided by the `window`
- We can now calculate our EMA, as we have a `previousEMA` from which to start
- Apply the EMA formula to calculate the `currentEMA`, and set the value as the `ema` property of `newData`
- Calculating the `trend` by dividing the current EMA by a previous value from the `data` array
- Finally, we can emit the signals related to the trend being up or down with `signalListener.emit()`

# ✅ Make sure it works

Once you've completed the code and saved the file, the Next.js development server will rebuild the page. Now, turning the price feed on will populate the chart (including the EMA)! Watch it run for a minute or two, observing the way the Pyth data is displayed. This is an un-optimized implementation of the chart and it's possible that it might feel a little choppy. There are ways to smooth it out, but they're beyond the scope of this lesson.

Don't forget to turn the price feed off before moving to the next step 😄.

---

# 🏁 Conclusion

We looked at how to display Pyth price data using the recharts components. We touched on how to calculate an Exponential moving average and how that informs the buy and sell signals for our liquidation bot. We are able to see how the price data is reflected on the chart, along with the plotted lines for the Simple moving average and the Exponential moving average.
