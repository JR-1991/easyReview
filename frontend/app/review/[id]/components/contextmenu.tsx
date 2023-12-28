import * as ContextMenu from '@radix-ui/react-context-menu';

export default function Context(
    {
        children,
        menu,
    }: {
        children: React.ReactNode,
        menu: React.ReactNode,
    }
) {
    return (
        <ContextMenu.Root>
            <ContextMenu.Trigger className="ContextMenuTrigger">
                {children}
            </ContextMenu.Trigger>
            <ContextMenu.Portal>
                <ContextMenu.Content>
                    <ContextMenu.Item >
                        {menu}
                    </ContextMenu.Item>
                </ContextMenu.Content>
            </ContextMenu.Portal>
        </ContextMenu.Root>
    )
}