import React, {useRef, useEffect} from 'react';

interface Sketch {
    mouse: { x: number; y: number };
    width: number;
    height: number;
    dt: number;

    fillStyle: string | CanvasGradient | CanvasPattern;
    strokeStyle: string | CanvasGradient | CanvasPattern;
    lineWidth: number;

    clearRect(x: number, y: number, w: number, h: number): void;

    beginPath(): void;

    rect(x: number, y: number, w: number, h: number): void;

    moveTo(x: number, y: number): void;

    lineTo(x: number, y: number): void;

    closePath(): void;

    fill(): void;

    stroke(): void;

    save(): void;

    restore(): void;

    translate(x: number, y: number): void;

    ctx: CanvasRenderingContext2D;
}

interface BuildingConfig {
    layer: number;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

interface SkylineConfig {
    layer: number;
    width: { min: number; max: number };
    height: { min: number; max: number };
    speed: number;
    color: string;
}

class Building {
    sketch: Sketch;
    layer!: number;
    x!: number;
    y!: number;
    width!: number;
    height!: number;
    color!: string;
    slantedTop!: boolean;
    slantedTopHeight!: number;
    slantedTopDirection!: boolean;
    spireTop!: boolean;
    spireTopWidth!: number;
    spireTopHeight!: number;
    antennaTop!: boolean;
    antennaTopWidth!: number;
    antennaTopHeight!: number;

    constructor(config: BuildingConfig, sketch: Sketch) {
        this.sketch = sketch;
        this.reset(config);
    }

    public reset(config: BuildingConfig): void {
        this.layer = config.layer;
        this.x = config.x;
        this.y = config.y;
        this.width = config.width;
        this.height = config.height;
        this.color = config.color;
        this.slantedTop = Math.floor(Math.random() * 10) === 0;
        this.slantedTopHeight = this.width / (Math.random() * 2 + 2);
        this.slantedTopDirection = Math.round(Math.random()) === 0;
        this.spireTop = Math.floor(Math.random() * 15) === 0;
        this.spireTopWidth = Math.random() * (this.width * 0.07 - this.width * 0.01) + this.width * 0.01;
        this.spireTopHeight = Math.random() * (20 - 10) + 10;
        this.antennaTop = !this.spireTop && Math.floor(Math.random() * 10) === 0;
        this.antennaTopWidth = this.layer / 2;
        this.antennaTopHeight = Math.random() * (20 - 5) + 5;
    }

    public render(): void {
        const {sketch} = this;
        sketch.fillStyle = sketch.strokeStyle = this.color;
        sketch.lineWidth = 2;

        sketch.beginPath();
        sketch.rect(this.x, this.y, this.width, this.height);
        sketch.fill();
        sketch.stroke();

        if (this.slantedTop) {
            sketch.beginPath();
            sketch.moveTo(this.x, this.y);
            sketch.lineTo(this.x + this.width, this.y);
            if (this.slantedTopDirection) {
                sketch.lineTo(this.x + this.width, this.y - this.slantedTopHeight);
            } else {
                sketch.lineTo(this.x, this.y - this.slantedTopHeight);
            }
            sketch.closePath();
            sketch.fill();
            sketch.stroke();
        }

        if (this.spireTop) {
            sketch.beginPath();
            sketch.moveTo(this.x + (this.width / 2), this.y - this.spireTopHeight);
            sketch.lineTo(this.x + (this.width / 2) + this.spireTopWidth, this.y);
            sketch.lineTo(this.x + (this.width / 2) - this.spireTopWidth, this.y);
            sketch.closePath();
            sketch.fill();
            sketch.stroke();
        }

        if (this.antennaTop) {
            sketch.beginPath();
            sketch.moveTo(this.x + (this.width / 2), this.y - this.antennaTopHeight);
            sketch.lineTo(this.x + (this.width / 2), this.y);
            sketch.lineWidth = this.antennaTopWidth;
            sketch.stroke();
        }
    }
}

class Skyline {
    sketch: Sketch;
    x: number = 0;
    buildings: Building[] = [];
    layer: number;
    width: { min: number; max: number };
    height: { min: number; max: number };
    speed: number;
    color: string;

    constructor(config: SkylineConfig, sketch: Sketch) {
        this.sketch = sketch;
        this.layer = config.layer;
        this.width = config.width;
        this.height = config.height;
        this.speed = config.speed;
        this.color = config.color;
        this.populate();
    }

    private populate(): void {
        let totalWidth = 0;
        while (totalWidth <= this.sketch.width + (this.width.max * 2)) {
            const newWidth = Math.round(Math.random() * (this.width.max - this.width.min) + this.width.min);
            const newHeight = Math.round(Math.random() * (this.height.max - this.height.min) + this.height.min);
            const lastBuilding = this.buildings[this.buildings.length - 1];

            this.buildings.push(new Building({
                layer: this.layer,
                x: this.buildings.length === 0 ? 0 : lastBuilding.x + lastBuilding.width,
                y: this.sketch.height - newHeight,
                width: newWidth,
                height: newHeight,
                color: this.color
            }, this.sketch));
            totalWidth += newWidth;
        }
    }

    public update(dt: number): void {
        this.x -= (this.sketch.mouse.x * this.speed) * dt;

        const firstBuilding = this.buildings[0];
        if (firstBuilding.width + firstBuilding.x + this.x < 0) {
            const newWidth = Math.round(Math.random() * (this.width.max - this.width.min) + this.width.min);
            const newHeight = Math.round(Math.random() * (this.height.max - this.height.min) + this.height.min);
            const lastBuilding = this.buildings[this.buildings.length - 1];

            firstBuilding.reset({
                layer: this.layer,
                x: lastBuilding.x + lastBuilding.width,
                y: this.sketch.height - newHeight,
                width: newWidth,
                height: newHeight,
                color: this.color,
            });

            this.buildings.push(this.buildings.shift()!);
        }
    }

    public render(): void {
        const {sketch} = this;
        sketch.save();
        sketch.translate(this.x, (sketch.height - sketch.mouse.y) / 20 * this.layer);

        for (let i = this.buildings.length - 1; i >= 0; i--) {
            this.buildings[i].render();
        }

        sketch.restore();
    }
}

const ParallaxCityscape: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const sketch: Sketch = {
            ctx: ctx,
            mouse: {x: canvas.width / 10, y: canvas.height},
            width: canvas.width,
            height: canvas.height,
            dt: 1,
            clearRect: ctx.clearRect.bind(ctx),
            beginPath: ctx.beginPath.bind(ctx),
            rect: ctx.rect.bind(ctx),
            moveTo: ctx.moveTo.bind(ctx),
            lineTo: ctx.lineTo.bind(ctx),
            closePath: ctx.closePath.bind(ctx),
            fill: ctx.fill.bind(ctx),
            stroke: ctx.stroke.bind(ctx),
            save: ctx.save.bind(ctx),
            restore: ctx.restore.bind(ctx),
            translate: ctx.translate.bind(ctx),
            get fillStyle() {
                return ctx.fillStyle;
            },
            set fillStyle(v) {
                ctx.fillStyle = v;
            },
            get strokeStyle() {
                return ctx.strokeStyle;
            },
            set strokeStyle(v) {
                ctx.strokeStyle = v;
            },
            get lineWidth() {
                return ctx.lineWidth;
            },
            set lineWidth(v) {
                ctx.lineWidth = v;
            },
        };

        const skylines: Skyline[] = [];

        for (let i = 4; i >= 0; i--) {
            skylines.push(new Skyline({
                layer: i + 1,
                width: {
                    min: (i + 1) * 20,
                    max: (i + 1) * 30,
                },
                height: {
                    min: 300 - (i * 35),
                    max: 750 - (i * 35),
                },
                speed: (i + 1) * 0.002,
                color: `hsl(200, ${i + 11}%, ${75 - (i * 13)}%)`
            }, sketch));
        }

        let lastTime = 0;

        const loop = (currentTime: number) => {
            if (lastTime) {
                sketch.dt = currentTime - lastTime;
            }
            lastTime = currentTime;

            let dt = sketch.dt < 0.1 ? 0.1 : sketch.dt / 16;
            dt = dt > 5 ? 5 : dt;
            for (let i = skylines.length - 1; i >= 0; i--) {
                skylines[i].update(dt);
            }

            sketch.clearRect(0, 0, sketch.width, sketch.height);
            for (let i = skylines.length - 1; i >= 0; i--) {
                skylines[i].render();
            }

            animationFrameId.current = requestAnimationFrame(loop);
        };

        const handleMouseMove = (e: MouseEvent) => {
            sketch.mouse.x = e.pageX / 2;
            sketch.mouse.y = e.pageY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        animationFrameId.current = requestAnimationFrame(loop);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} style={{display: 'block'}}/>;
};

export default ParallaxCityscape;