import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import {
    renderWithTranslation,
} from '../../../../shared/lib/tests/renderWithTranslation/renderWithTranslation';

describe('Button', () => {
    test('test render', async () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toggle', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();

        const toggleBtn = screen.getByTestId('sidebar-toggle');
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});
