import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Sidebar } from './sidebar';

const meta = {
    title: 'Sidebar',
    component: Sidebar,
} satisfies Meta<typeof Sidebar>;

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
    args: {
        collapsible: "none",
    },
};

export const IconCollapsible: Story = {
    args: {
        collapsible: "icon",
    },
};

export const OffcanvasCollapsible: Story = {
    args: {
        collapsible: "offcanvas",
    },
};
