import React from 'react';
import { cy } from '@itsjonq/cyan';
import { BaseControls } from '../BaseControls';

describe('BaseControls', () => {
	test('should render', () => {
		cy.render(<BaseControls />);

		expect(cy.get('div').exists()).toBeTruthy();
	});
});
