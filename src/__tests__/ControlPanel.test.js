import React from 'react';
import { cy } from '@itsjonq/cyan';
import { BaseControls as Controls } from '../index';

describe('Controls', () => {
	test('should render', () => {
		cy.render(<Controls />);

		expect(cy.get('div').exists()).toBeTruthy();
	});
});
