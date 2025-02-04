import { h } from 'vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import './style.css';

const EMOJI_MAP = {
    tip: '💡',
    info: 'ℹ️',
    warning: '⚠️',
    danger: '🔥',
    details: '📜',
} as const;

const YAML_CLASS = 'language-yaml';
const HIGHLIGHT_CLASS = 'hash-highlight';
let isHandlerAttached = false;

const postRenderTasks = () => {
    if (import.meta.env.SSR) return;

    injectEmojis();
    highlightHashElement();
    processYamlBlocks();
};

function injectEmojis() {
    const processBlock = (block: Element, emoji: string) => {
        const title = block.querySelector('.custom-block-title, summary') as HTMLElement | null;
        if (!title || title.dataset.emojiAdded) return;

        title.dataset.emojiAdded = 'true';
        title.insertAdjacentHTML('afterbegin', `${emoji} `);
    };

    Object.entries(EMOJI_MAP).forEach(([type, emoji]) => {
        const selector = type === 'details' ? 'details.custom-block.details' : `.custom-block.${type}`;
        document.querySelectorAll(selector).forEach((block) => {
            processBlock(block, emoji);
        });
    });
}

function highlightHashElement() {
    if (import.meta.env.SSR) return;

    document.querySelectorAll(`.${HIGHLIGHT_CLASS}`).forEach((el) => {
        el.classList.remove(HIGHLIGHT_CLASS);
    });

    const hash = decodeURIComponent(window.location.hash);
    if (!hash) return;

    const target = document.querySelector(hash);
    if (!target) return;

    target.classList.add(HIGHLIGHT_CLASS);

    const header = document.querySelector('.VPNavBar') as HTMLElement | null;
    const headerHeight = header?.offsetHeight || 60;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
    });
}

function processYamlBlocks() {
    if (import.meta.env.SSR) return;

    document.querySelectorAll<HTMLPreElement>(`div[class*="${YAML_CLASS}"] pre`).forEach((pre) => {
        pre.classList.add('yaml-lines');

        pre.querySelectorAll('.line').forEach((line) => {
            if (line.querySelector('.line-content')) return;

            const wrapper = document.createElement('span');
            wrapper.className = 'line-content';
            wrapper.innerHTML = line.innerHTML;
            line.innerHTML = '';
            line.appendChild(wrapper);
        });
    });
}

const scheduleTask = (fn: () => void) => {
    if (import.meta.env.SSR) {
        fn();
    } else {
        requestAnimationFrame(fn);
    }
};

export default {
    extends: DefaultTheme,

    Layout: () => h(DefaultTheme.Layout, null, {
            'page-after': () => scheduleTask(postRenderTasks),
    }),

    enhanceApp({ app, router }) {
        app.provide('post-render', postRenderTasks);

        router.onAfterRouteChanged = () => {
            scheduleTask(postRenderTasks);
        };

        if (!isHandlerAttached && !import.meta.env.SSR) {
            window.addEventListener('hashchange', highlightHashElement);
            document.addEventListener('click', (e) => {
                const target = e.target as HTMLElement;
                if (target.closest('.header-anchor, a[href^="#"]')) {
                    scheduleTask(highlightHashElement);
                }
            });
            isHandlerAttached = true;
        }
    },
} satisfies Theme;