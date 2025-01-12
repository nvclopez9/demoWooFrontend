import { useState } from 'react';
import NextImage from 'next/image';
import { cn } from '@/utils/ui';
import { LoadingSpinner } from '@/ui/LoadingSpinner';
import { AspectRatio } from "@/ui/aspect-ratio"
import { JSX } from 'react/jsx-runtime';

export type ImageProps = {
    className?: string;
    src: string;
    sizes?: string;
    width?: number;
    height?: number;
    ratio?: number;
    alt: string;
    style?: JSX.IntrinsicElements['img']['style']
    fill?: boolean;
    priority?: boolean;
}

export function Image(props: ImageProps) {
    const [isLoading, setLoading] = useState(true);

    const {
        className = '',
        src,
        alt,
        sizes,
        width,
        height,
        ratio,
        style,
        fill = true,
        priority,
    } = props;

    return (
        <div
            className={cn(
                'overflow-hidden group relative',
                className && className,
            )}
            style={style}
        >
            <AspectRatio ratio={ratio}>
                {isLoading && (
                    <LoadingSpinner className="position absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                )}
                <NextImage
                    src={src}
                    alt={alt}
                    width={width as number}
                    height={height as number}
                    sizes={sizes}
                    className={cn(
                        'group-hover:opacity-75 object-cover',
                        'duration-700 ease-in-out',
                        isLoading
                        ? 'grayscale blur-2xl scale-110'
                        : 'grayscale-0 blur-0 scale-100',
                    )}
                    fill={fill}
                    onLoadingComplete={() => setLoading(false)}
                    priority={priority}
                />
            </AspectRatio>
        </div>
    );
}