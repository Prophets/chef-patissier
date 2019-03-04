import React from 'react';
import {
    MjmlSection,
    MjmlColumn,
    MjmlGroup
} from 'mjml-react';
import chunk from 'lodash/chunk';
import times from 'lodash/times';
import styles from './global-styles';

const fillUp = (columns, row) => times(Math.max(0, columns - row.length), (item, key) => (
    <MjmlColumn key={key} padding="0" />
));

const justifyResolve = (value) => {
    const types = {
        left: true,
        right: true,
        stretch: true,
        center: true,
    };

    if (types[value]) {
        return value;
    }

    return 'left';
};

const calcWidths = (columns, gutter, maxWidth) => {
    const spacerWidth = (gutter / maxWidth) * 100;
    const spacersTotalWidth = (columns - 1) * spacerWidth;

    const columnsLeftOverWidth = 100 - spacersTotalWidth;
    const columnWidth = columnsLeftOverWidth / columns;

    return {
        columnWidth,
        spacerWidth,
    };
};
const Grid = ({ children, ...style }) => {
    let { columns, gutter, justifyContent, responsive, maxWidth, verticalAlign } = { ...styles.grid, ...style };
    gutter = parseInt(gutter, 10);
    maxWidth = parseInt(maxWidth, 10);
    responsive = JSON.parse(responsive);
    return <>
        {
            chunk(React.Children.toArray(children), columns).map((row, key) => {
                let newRow = row;
                let totalColumns = columns;
                if ( justifyResolve(justifyContent) === 'stretch' ) {
                    totalColumns = row.length;
                }
                const { columnWidth, spacerWidth } = calcWidths(totalColumns, gutter, maxWidth);

                if ( justifyResolve(justifyContent) === 'right') {
                    newRow = fillUp(columns, row).concat(row);
                }

                if ( justifyResolve(justifyContent) === 'left') {
                    newRow = row.concat(fillUp(columns, row));
                }

                let rowElements = newRow.map((item, itemKey) => {
                    const column = React.cloneElement(item, {
                        key: 'column-' + itemKey,
                        ...item.props,
                        mjClass: (item.props.mjClass || '' ) + ' grid__item',
                        cssClass: (item.props.cssClass || '') + ' grid__item' + ` grid--v-align-${verticalAlign}`,
                        width: `${columnWidth}%`,
                    });

                    return <React.Fragment key={itemKey}>
                        { column }
                        { itemKey < columns - 1 &&
                            <MjmlColumn cssClass="grid__gutter" padding="0" width={`${spacerWidth}%`} mjClass="grid__gutter" />
                        }
                    </React.Fragment>;
                });

                if ( !responsive ) {
                    rowElements = <MjmlGroup cssClass={ `grid__fixed grid--v-align-${verticalAlign}` }>{rowElements}</MjmlGroup>;
                }
                return <MjmlSection cssClass={`grid--v-align-${verticalAlign}`} padding="0" key={key}>
                    {
                        rowElements
                    }
                </MjmlSection>;
            })
        }
    </>;
};

Grid.style = (props) => {
    styles.grid = {
        ...styles.grid, ...props,
    };
    return undefined;
};

export default Grid;
