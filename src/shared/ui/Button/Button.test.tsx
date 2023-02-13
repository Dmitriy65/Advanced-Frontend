import { render, screen } from '@testing-library/react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

describe('Button', () => {
    test('Test render', () => {
        render(<Button>Test #123</Button>);
        expect(screen.getByText('Test #123')).toBeInTheDocument();
    });

    test('Test theme', () => {
        render(<Button theme={ThemeButton.CLEAR}>Clear Button</Button>);
        expect(screen.getByText('Clear Button')).toHaveClass('clear');
        screen.debug();
    });
});
