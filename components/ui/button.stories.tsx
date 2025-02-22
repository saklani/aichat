import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Plus } from "lucide-react"
import { Button } from './button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'Button',
    component: Button,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        variant: { control: 'select' },
        size: { control: 'select' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        variant: 'default',
        size: 'default',
        children: 'Button',
    },
};

export const Secondary: Story = {
    args: {
        variant: 'secondary',
        size: 'default',
        children: 'Button',
    },
};

export const Outline: Story = {
    args: {
        variant: 'outline',
        size: 'default',
        children: 'Button',
    },
};


export const Ghost: Story = {
    args: {
        variant: 'ghost',
        size: 'default',
        children: 'Button',
    },
};


export const Icon: Story = {
    args: {
        variant: 'default',
        size: 'icon',
        children: <Plus className="size-4" />,
    },
};

export const Sidebar: Story = {
    args: {
        variant: 'sidebar',
        size: 'default',
        children: 'Sidebar Button',
    },
};