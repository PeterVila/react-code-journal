set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "entries" (
  "postId"   serial,
  "title"      text           not null,
  "link"    text           not null,
  "image"     text        not null,
  "description"     text        not null,
  "technologies"     text        not null,
  "createdAt" timestamptz(6) not null default now(),
  primary key ("postId")
);

