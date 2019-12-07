# 🎛 Controls

> A control panel to develop and prototype React UI

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Installation](#installation)
-   [Usage](#usage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
