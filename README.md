# 🎛 Controls

[![Build Status](https://travis-ci.org/ItsJonQ/controls.svg?branch=master)](https://travis-ci.org/ItsJonQ/controls)

> A control panel to develop and prototype React UI

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Installation](#installation)
-   [Usage](#usage)
    -   [Fields](#fields)

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
			<Controls />
			<h2>{title}</h2>
			<p>{amount}</p>
		</div>
	);
}
```

### Fields

```jsx
import React from 'react';
import { useControls, Controls } from '@itsjonq/controls';

function Example() {
	const {
		// Fields
		boolean,
		color,
		date,
		number,
		select,
		text,
		textarea,
		// All attributes
		attributes,
	} = useControls();

	boolean('checked', true);
	color('mainColor', 'red');
	date('publishDate', 'December 8, 2019');
	number('amount', 10, { min: 0, max: 50 });
	select(
		'status',
		{
			Published: 'published',
			Draft: 'draft',
			Private: 'private',
		},
		'published',
	);
	text('title', 'My Title');
	textarea('description', 'Words...');

	// The names of the attributes registered with the fields
	const {
		checked,
		mainColor,
		publishDate,
		amount,
		status,
		title,
		description,
	} = attributes;

	return <div>...</div>;
}
```
