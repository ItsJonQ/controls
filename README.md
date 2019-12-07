# 🎛 Controls

> A control panel to develop React UI

## Installation

```
npm install @itsjonq/controls
```

## Usage

```jsx
import React from 'react';
import { useControls, Controls } from '@itsjonq/controls';

function Example() {
	const { text, number } = useControls();
	const title = text('Title', 'My Title');
	const amount = number('Amount', 10, { min: 0, max: 50 });

	return (
		<div>
			<h2>{title}</h2>
			<p>{amount}</p>
		</div>
	);
}
```
