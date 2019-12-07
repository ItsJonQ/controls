import React from 'react';
import { cy } from '@itsjonq/cyan';
import { BaseControlPanel as ControlPanel } from '../index';

describe('ControlPanel', () => {
	test('should render', () => {
		cy.render(<ControlPanel />);

		expect(cy.get('div').exists()).toBeTruthy();
	});
});
