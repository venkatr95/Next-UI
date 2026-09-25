"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@next-ui/card";
import { Button } from "@next-ui/button";

export default function CardsPage() {
  return (
    <div className="space-y-12 p-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Default Card</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Standard card with header, body, and footer.
        </p>
        <Card className="max-w-md">
          <CardHeader>
            <h3 className="text-lg font-semibold">Card Title</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 dark:text-gray-400">
              This is the card body with some content. You can put any content here.
            </p>
          </CardBody>
          <CardFooter>
            <Button size="sm">Action</Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Glass Style</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Card with glass morphism effect.
        </p>
        <Card styleType="glass" className="max-w-md">
          <CardHeader>
            <h3 className="text-lg font-semibold">Glass Card</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 dark:text-gray-400">
              This card uses the glass style with backdrop blur.
            </p>
          </CardBody>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Gradient Card</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Card with gradient background.
        </p>
        <Card gradient="ocean" className="max-w-md text-white">
          <CardHeader>
            <h3 className="text-lg font-semibold">Gradient Card</h3>
          </CardHeader>
          <CardBody>
            <p>This card has an ocean gradient background.</p>
          </CardBody>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Hoverable Card</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Card with lift effect on hover.
        </p>
        <Card isHoverable className="max-w-md">
          <CardHeader>
            <h3 className="text-lg font-semibold">Hoverable Card</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 dark:text-gray-400">
              Hover over this card to see the lift effect.
            </p>
          </CardBody>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pressable Card</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Card with press effect on click.
        </p>
        <Card isPressable className="max-w-md">
          <CardHeader>
            <h3 className="text-lg font-semibold">Pressable Card</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600 dark:text-gray-400">
              Click this card to see the press effect.
            </p>
          </CardBody>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Card Grid</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Multiple cards in a responsive grid.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card gradient="sunset" className="text-white">
            <CardHeader>
              <h3 className="text-lg font-semibold">Sunset</h3>
            </CardHeader>
            <CardBody>
              <p>Warm sunset gradient</p>
            </CardBody>
          </Card>
          <Card gradient="aurora" className="text-white">
            <CardHeader>
              <h3 className="text-lg font-semibold">Aurora</h3>
            </CardHeader>
            <CardBody>
              <p>Cool aurora gradient</p>
            </CardBody>
          </Card>
          <Card gradient="purple-glow" className="text-white">
            <CardHeader>
              <h3 className="text-lg font-semibold">Purple Glow</h3>
            </CardHeader>
            <CardBody>
              <p>Vibrant purple gradient</p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
